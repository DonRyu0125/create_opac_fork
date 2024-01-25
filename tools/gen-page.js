import chalk from 'chalk';


function main() {
    console.log(chalk.bgBlueBright('Hello world!'));
    // eslint-disable-next-line no-undef
    console.log(process.argv[2])
}

main();