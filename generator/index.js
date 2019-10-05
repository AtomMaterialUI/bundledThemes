// Load libraries.
const fs     = require('fs');
const path   = require('path');
const glob   = require('glob');
const colors = require('colors');
const exec   = require('child_process').execSync;

// Load modules.
const renderer = require('./src/renderer');

// Path constants. Fixed due to execution within the docker image.
const THEME_PATH   = path.resolve('themes');
const OUTPUT_PATH  = path.resolve('output');
const PATTERN_PATH = path.resolve('patterns');

// Path to pattern file, defined by environmental variable.
const PATTERN_FILE = process.env.PATTERN || 'example';

// Load the contents of the requested pattern.
const pattern = require(PATTERN_PATH + '/' + PATTERN_FILE + '.json');

// Load an array of theme files.
const themes = glob.sync(THEME_PATH + '/**/*.json');

// Log current theme generation.
console.log(colors.green('Total themes: ') + colors.yellow(themes.length));

// Load theme default values.
const defaults = require('./defaults.json');

// Iterate themes for building.
themes.map(theme => {

    // Load theme JSON into object.
    theme = Object.assign({}, defaults, require(theme));

    // Log current theme generation.
    console.log(colors.green('Generating: ') + colors.yellow(theme.meta.name));

    // Fetch a renderer for the theme.
    const render = renderer(theme);

    // Iterate patterns.
    for (let source in pattern) {

        // Set a helper variable for a destination.
        const destination = pattern[source];

        // Read the pattern content from the filesystem.
        source = fs.readFileSync(PATTERN_PATH + '/' + source).toString();

        // Compile a template for the pattern.
        let template = render.compile(source);

        // Execute the template to render the pattern.
        const renderedPattern = template(theme);

        // Create a template for the destination path.
        template = render.compile(destination);

        // Execute the template to render the path.
        const renderedPath = template(theme);

        // Yep its nasty, but the node to do it properly is also nasty.
        exec('mkdir -p ' + path.dirname(OUTPUT_PATH + '/' + renderedPath));

        // Write the rendered pattern file to disk.
        fs.writeFileSync(OUTPUT_PATH + '/' + renderedPath, renderedPattern);
    }
});
