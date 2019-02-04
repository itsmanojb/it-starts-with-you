# It starts with you
A scaffolding project, with task automation for website development.

To get started, run:
```
npm i
```

This project uses,
* Nunjucks for HTML as templating engine.
* SCSS for css pre-processing.
* Gulp for all these tasks automation.
* VS code's live-server extension for live reloading.
* Bootstrap 4 for theming.

<code>src</code> folder contains all nunjucks, scss files, which turn into html and css respectively in <code>build</code>folder. Images, fonts and scripts have to placed in that folder. <code>dist</code> folder will be used for creating the distribution/ production build.

###### Available Gulp tasks

#### 1. Nunjucks
```
$ gulp nunjucks
```
This will convert each nunjuck files into html page from <code>src/pages</code> in the root of <code>build</code> folder. For instance the <code>index.njk</code> will be converted into <code>index.html</code>. While creating these htmls files, **templates** and **data.json** will be used.

#### 2. SCSS
```
$ gulp scss
```
This will convert scss files into css and place those in <code>build/css</code> folder. 

#### 3. Useref
```
$ gulp useref
```
This will bundle (concate and minify) css/ js files. 

#### 4. Images
```
$ gulp images
```
This minify png, jpg, jpeg, gif and svg files of <code>build/images</code> folder and put those into <code>dist/images</code> folder.

#### 5. Watch
```
$ gulp watch
```
This will watch over any scss/ nunjucks file change in their respective directories of the <code>src</code> folder, and if found corresponsing gulp tasks will be performed automaticallyand converted files will be generated in the <code>build</code> folder.

#### 6. Clean:dist
```
$ gulp clean:dist
```
While building a fresh build for production cleaing onld codebase may be required. Use this command and <code>dist</code> folder will be cleaned.

#### 7. Vendors | Fonts
```
$ gulp vendors
$ gulp fonts
```
This will convert simply copy the fonts and vendor libraries from <code>build</code> folder to <code>dist</code> folder. 



Finally, for building a production/ distribution build, run: 
```
$ gulp dist
```



_**Note:** to change the task names, just edit the gulpfile.js file._ 