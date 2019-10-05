const handlebars = require('handlebars');
const color = require('tinycolor2');
const DEFAULT = '#000000';

module.exports = theme => {

    // Common functionality for helpers.
    const handler = (args, callback) => {

        // Set current result to default.
        let result = DEFAULT;

        // Iterate argument set in reverse.
        args.reverse().map(arg => {

            // Cast to string.
            arg = String(arg);
            
            // Check if it exists.
            if (theme[arg] !== undefined) {

                // Set curent color if it exists.
                result = theme[arg];

            // Otherwise, if the key is actually a color.
            } else if (arg.startsWith('#')) {

                // Just use that as the value.
                result = arg;
            }
        });

        // Wrap in the colors library and return executed callback.
        return callback(color(result));
    };

    // Helper to render hex colours.
    handlebars.registerHelper('hex', (...args) => {
        return handler(args, color => color.toHexString().toLowerCase());
    });

    // Helper to render darker hex colours.
    handlebars.registerHelper('hex_darker', (percent, ...args) => {
        return handler(args, color => color.darken(percent).toHexString().toLowerCase());
    });

    // Helper to render lighter hex colours.
    handlebars.registerHelper('hex_lighter', (percent, ...args) => {
        return handler(args, color => color.lighten(percent).toHexString().toLowerCase());
    });

    // Helper to render rgb colours.
    handlebars.registerHelper('rgb', (...args) => {
        return handler(args, color => color.toRgbString());
    });

    // Helper to render hsl colours.
    handlebars.registerHelper('hsl', (...args) => {
        return handler(args, color => color.toHslString());
    });

    // Helper to render hex colours without pound sign.
    handlebars.registerHelper('hexl', (...args) => {
        return handler(args, color => color.toHex().toLowerCase());
    });

    // Helper to render darker hex colours without pound.
    handlebars.registerHelper('hexl_darker', (percent, ...args) => {
        return handler(args, color => color.darken(percent).toHex().toLowerCase());
    });
    
    // Helper to render lighter hex colours without pound.
    handlebars.registerHelper('hexl_lighter', (percent, ...args) => {
        return handler(args, color => color.lighten(percent).toHex().toLowerCase());
    });

    // Helper to render in xcode format.
    handlebars.registerHelper('xcode', (...args) => {
        return handler(args, color => {
            color = color.toRgb();
            return (color.r / 255) + ' ' + (color.g / 255) + ' ' + (color.b / 255);
        });
    });

    // Helper to render in fraction format.
    handlebars.registerHelper('frac', (channel, ...args) => {
        return handler(args, color => { 
            color = color.toRgb();
            return color[channel] / 255 
        });
    });

    // Helper to render in fraction format but lighter.
    handlebars.registerHelper('frac_lighter', (channel, percent, ...args) => {
        return handler(args, color => { 
            color = color.lighten(percent).toRgb();
            return color[channel] / 255 
        });
    });

    // Helper to render in BGR format... yeah thanks VS code.
    handlebars.registerHelper('gbr', (...args) => {
        return handler(args, color => { 
            color = color.toHex().toLowerCase();
            const red = color.substring(0,2);
            const blue = color.substring(2,4);
            const green = color.substring(4,6);

            return green + blue + red;
        });
    });

    // Helper to render in BGR format... yeah thanks VS code.
    handlebars.registerHelper('gbr_lighter', (percent, ...args) => {
        return handler(args, color => { 
            color = color.lighten(percent).toHex().toLowerCase();
            const red = color.substring(0,2);
            const blue = color.substring(2,4);
            const green = color.substring(4,6);

            return green + blue + red;
        });
    });

    // Helper to render in BGR format... yeah thanks VS code.
    handlebars.registerHelper('gbr_darker', (percent, ...args) => {
        return handler(args, color => { 
            color = color.darken(percent).toHex().toLowerCase();
            const red = color.substring(0,2);
            const blue = color.substring(2,4);
            const green = color.substring(4,6);

            return green + blue + red;
        });
    });

    // Render current copyright year.
    handlebars.registerHelper('copyright', () => {

        // Get the full year.
        return (new Date).getFullYear();
    });

    // Return the renderer.
    return handlebars;
};