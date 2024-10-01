module.exports = [
  {
    type: "input",
    name: "name",
    message: "What is the component name?",
    validate: (input) => {
      if (input.trim() === "") {
        return "Component name cannot be empty";
      }
      return true;
    },
  },
];
