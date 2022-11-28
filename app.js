// Imported modules of core module
import readline from "readline";
import fs from "fs";

// Imported modules of third-party modules
import valid from "validator";

// Creating an interface of input and output with readline module and process function
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function for answer with a parameter(questions) that will be asked
function answers(questions) {
    // Promise to callback the requirement that are awaiting in main async function
    return new Promise((callback, error) => {
        // Questions and answer for user to input their answers on the respective questions
        rl.question(questions, (answer) => {
            // The resolve (callback in this case) pointed back to the main async function and filled to each variables that are defined in that main async function
            callback(answer);
        }, () => {
            // Error if something doesn't work as intended
            error();
        });
    });
}

// Main async function to start CLI
const contactCli = async () => {
    // Questions asking on someone's biography
    // Question 1, asking name
    const name = await answers("What's your name? ");
    
    // Name validation
    if (valid.isAlpha(name, 'en-US', { ignore: ' ' })) {
        // Question 2, asking email
        const email = await answers("What's your email? ");
        // Email validation
        if (valid.isEmail(email)) {
            // Question 3, asking phone number
            const telp = await answers("What's your phone number? ");
            // Phone number validation
            if (valid.isMobilePhone(telp, 'id-ID')) {
                // Display the output of all inputted answers
                console.log(`Your name is ${(name)}`);
                console.log(`Your email is ${(email)}`);
                console.log(`Your number is ${(telp)}`);
                // If all validation are passed then,
                // make a directory, if such file doesn't exist yet
                // Make a folder named "data"
                const dirPath = './data';
                if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
                // File named "contacts" with a data type of ".json"
                const dataPath = './data/contacts.json';
                if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]', 'utf-8');
                // Make an object for the answers
                const contact = { name, email, telp };
                // Read the JSON file in dir Path
                const file = fs.readFileSync('data/contacts.json', 'utf-8');
                // Variable for parsing the read file as it was declared from above code
                const parseContact = JSON.parse(file);
                // Push the array to JSON
                parseContact.push(contact);
                // Write the file in JSON
                fs.writeFileSync('data/contacts.json', JSON.stringify(parseContact));
                console.log('Terima kasih telah memasukkan data');
            // Phone number format is wrong
            } else {
                console.log('Your number format is wrong');
                console.log('Data fail to input');
                rl.close();
            }
        // Email format is wrong
        } else {
            console.log('Your email format is wrong');
            rl.close();
        }
    // Name format is wrong
    } else {
        console.log('Your name contains NOT characters');
        rl.close();
    }
    // Close the readLine module
    rl.close();
};

contactCli();