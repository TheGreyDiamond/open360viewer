import {minify} from 'minify';
import tryToCatch from 'try-to-catch';
import fs from 'fs';
import glob from 'glob';

const options = {
    
};


var getDirectories = function (src, callback) {
    glob('src/**/*', callback);
  };
  getDirectories('test', function (err, res) {
    if (err) {
      console.log('Error', err);
    } else {
        for(const file in res){
            // console.log(minify(res[file], options));
            const myFile = res[file];
            const dst = myFile.replace("src", "dist");
            console.log(myFile, "    ->    ", dst);
            if(!fs.lstatSync(myFile).isDirectory() ){
                let data = minify(myFile, options).then(function(data) {
                    fs.writeFileSync(dst, data);
                })
            }
        }
      
    }
  });