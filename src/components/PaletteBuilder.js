
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
            results.push({ hex: heximalCode, isDark: isDark(red, green, blue), percentage: percentage })

        }
    }
    return results

}



const loopOverPixels = (width, height, context) => {

    var pixels = [];
    var pixelCounter = 0;

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

    return results

}

const usePalette = (setPixels, imageUrl, setIsLoading) => {


    useEffect(() => {

        setPixels([])

        const canvas = document.getElementById("myCanvas");
        canvas.width = window.innerWidth * 0.6;
        canvas.height = window.innerHeight * 0.6;
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

                setPixels(loopOverPixels(canvas.width, canvas.height, context))

            };



        }
        setIsLoading(false)

        // eslint-disable-next-line
    }, [imageUrl, setPixels])

}

export { usePalette };



