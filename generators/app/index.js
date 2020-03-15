"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const nodefs = require("fs");

const SCHEMA_FOLDER = "_schema";

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: "list",
        name: "_lang",
        message: "Generate State JSON Machine Code on this language : ",
        choices: ["Flutter", "Svelte", "<Others to be created>"],
        default: "Flutter"
      }
    ];

    const props = await this.prompt(prompts);
    // To access props later use this.props.someAnswer;
    this.props = props;
  }

  writing() {
    const destPath = this.destinationRoot();
    if (this.props._lang === "Flutter") {
      const schemaPath = destPath + path.sep + SCHEMA_FOLDER;
      const dir = nodefs.opendirSync(schemaPath);
      let dirent;
      this.fs.copy(this.templatePath("Flutter/**"), destPath, {
        globOptions: { ignore: ["_*.*"], dot: true }
      });
      while ((dirent = dir.readSync()) !== null) {
        console.log(dirent.name);
        let json = require(schemaPath + path.sep + dirent.name);
        console.log("json got is: ", json);
        this.fs.copyTpl(
          this.templatePath("Flutter_template/_page.dart"),
          this.destinationPath("lib/" + json.id + ".dart"),
          json
        );
      }

      dir.closeSync();
    }
  }

  install() {
    /* Continue here
    this.spawnCommand("flutter", ["pub", "get"]);
    */
  }
};
