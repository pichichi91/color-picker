
import { useEffect } from 'react';

const calculateSingleHexColor = (color) => {
    return parseInt(color).toString(16).padStart(2, "0").toUpperCase();
}

const RGBToHex = (red, green, blue) => {
    return "#" + calculateSingleHexColor(red) + calculateSingleHexColor(green) + calculateSingleHexColor(blue);
}


const isDark = (red, green, blue) => {

    const MAX_LUMA_LIMT = 70;

    const luma = Math.sqrt(
        0.299 * (red * red) +
        0.587 * (green * green) +
        0.114 * (blue * blue)
    ); // per ITU-R BT.709c


    return luma < MAX_LUMA_LIMT;
}

const comparePixels = (a, b) => {
    if (parseInt(a.percentage) < parseInt(b.percentage)) {
        return 1;
    }
    if (parseInt(a.percentage) > parseInt(b.percentage)) {
        return -1;
    }
    return 0;
}

const calculateResults = (pixels, width, pixelCounter) => {
    const reducedMap = pixels.reduce(function (element, pixel) {
        const item = pixel.hash
        if (!element[item]) element[item] = 0;
        element[item] = element[item] + 1
        return element
    }, {})
    const results = []

    for (const key in reducedMap) {
        const count = reducedMap[key];

        if (count > width / 2) {
            const [red, green, blue] = key.split("-")
            const heximalCode = RGBToHex(red, green, blue)
            const percentage = ((100 / pixelCounter) * count).toFixed(2)
            results.push({ hex: heximalCode, isDark: isDark(red, green, blue), red: red, green: green, blue: blue, percentage: percentage })

        }
    }



    results.sort(comparePixels);

    return results

}

const changeImage = (context, canvas, pixels) => {
    console.log("🚀 ~ file: PaletteBuilder.js ~ line 52 ~ changeImage ~ pixels", pixels[0])

    const mainColor = pixels[0].hex === "#FFFFFF" && pixels.length > 1 ? pixels[1] : pixels[0];
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i] = mainColor.red;     // red
        data[i + 1] = mainColor.green; // green
        data[i + 2] = mainColor.blue; // blue
    }
    context.putImageData(imageData, 0, 0);
}

const loopOverPixels = (canvas, context, showOnlyForm) => {

    var pixels = [];
    var pixelCounter = 0;

    const width = canvas.width;
    const height = canvas.height;

    for (var yAxis = 0; yAxis <= width; yAxis++) {
        for (var xAxis = 0; xAxis <= height; xAxis++) {

            const data = context.getImageData(xAxis, yAxis, 1, 1).data;
            const [red, green, blue] = data;
            const isColor = data.reduce((counter, element) => counter + element, 0) > 0

            if (isColor) {
                const hash = `${red}-${green}-${blue}`
                const color = [red, green, blue];
                pixels.push({ hash, color })
                pixelCounter++;


            }

        }


    }


    const results = calculateResults(pixels, width, pixelCounter)

    showOnlyForm && changeImage(context, canvas, results)

    return results

}

const usePalette = (setPixels, imageUrl, setIsLoading, showOnlyForm) => {



    useEffect(() => {


        const canvas = document.getElementById("myCanvas");
        canvas.width = window.innerWidth * 0.3;
        canvas.height = window.innerHeight * 0.3;
        const context = canvas.getContext('2d');
        const image = document.querySelector('#logo')
        context.clearRect(0, 0, canvas.width, canvas.height);




        if (image) {
            image.src = "";
            image.setAttribute('crossOrigin', '');
            image.src = imageUrl;




            image.onload = function () {
                context.clearRect(0, 0, canvas.width, canvas.height);

                const horizontalRatio = canvas.width / image.width;
                var verticalRatio = canvas.height / image.height;

                var ratio = Math.min(horizontalRatio, verticalRatio);

                var horizontalCenterShift = (canvas.width - image.width * ratio) / 2;
                var verticalCenterShift = (canvas.height - image.height * ratio) / 2;

                context.drawImage(image, 0, 0, image.width, image.height,
                    horizontalCenterShift, verticalCenterShift, image.width * ratio, image.height * ratio);

                setPixels(loopOverPixels(canvas, context, showOnlyForm))

            };



        }
        setIsLoading(false)

        // eslint-disable-next-line
    }, [imageUrl, setPixels, showOnlyForm])

}

export { usePalette };



