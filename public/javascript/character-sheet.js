//REQUIRE CHARACTER SHEET
const CharacterSheets = require('dyslexic-charactersheets');
//DOCUMENTATION LINK
//https://github.com/dyslexic-charactersheets/lib-charactersheets



//GIVE THE CHARACTER DETAILS TO THE FUNCTION
let request = {
    data: {
        type: "character",
        id: "${234nk32lo}", //will be randomly generated/come from hero model
        attributes: {
            name: "", //this information will pull from the hero model
            gender: "",
            race: "",
            class: "",
            age: ""
        }
    }
};

//CREATE THE CHARACTER SHEETS
CharacterSheets.create(request).then(createCharacterSheet => {
    fs.writeFile(createCharacterSheet.filename, createCharacterSheet.data, (err) =>{});
});