"use strict";
const Generator = require("yeoman-generator");
const { JSDOM } = require("jsdom");

const pageHtml = `
<head>
    <var name="num01" type="integer"></var>
    <var name="str01" type="string"></var>
    <script type="module" src="https://unpkg.com/@ui5/webcomponents/dist/Label?module"></script>
    <script type="module" src="https://unpkg.com/@ui5/webcomponents/dist/Input?module"></script>
    <script type="module" src="https://unpkg.com/@ui5/webcomponents/dist/Button?module"></script>
</head>

<pi-col>
    <ui5-label>Haloo {str01}</ui5-label>
    <ui5-input value="str01" on:input="setValue('str01', args[0].target.value)"></ui5-input>
    <ui5-button on:click="alert(str01)">press</ui5-button>
</pi-col>
`;

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: "list",
        name: "_lang",
        message: "Generate State JSON Machine Code on this language : ",
        choices: ["Flutter", "Svelte", "<Others to be created>"],
        default: "Svelte"
      }
    ];

    const props = await this.prompt(prompts);
    // To access props later use this.props.someAnswer;
    this.props = props;
  }

  writing() {
    const destPath = this.destinationRoot();
    switch (this.props._lang) {
      case "Flutter":
        break;
      case "Svelte": {
        console.log("------->999");
        const dom = new JSDOM(pageHtml);
        console.log("body2: ", dom.window.document.body.innerHTML);
        const templateData = {};
        this.fs.copy(this.templatePath("Svelte/**"), destPath, {
          globOptions: { ignore: ["_*.*"], dot: true }
        });
        this.fs.copyTpl(
          this.templatePath("Svelte_template/App.template"),
          this.destinationPath("src/App.svelte"),
          templateData
        );
        break;
      }

      default:
    }
  }

  install() {
    switch (this.props._lang) {
      case "Flutter":
        break;
      case "Svelte":
        //this.spawnCommandSync("npm", ["install"]);
        //this.spawnCommandSync("npm", ["run", "dev"]);
        break;
      default:
    }
  }
};
