const { parallel, watch, series } = require("gulp")
const { css } = require("./tasks/css")
const { projectConfig } = require("./tasks/project")



/****************************************************************
* 自动化
****************************************************************/
// let autoGlobs = projectConfig.autoBuild[0] == null ? '' : projectConfig.autoBuild
// watch(autoGlobs, parallel(css))

/****************************************************************
* Gulp Commands
****************************************************************/
// exports.min = parallel(cssMini)
exports.default = parallel(css)
exports.css = parallel(css)