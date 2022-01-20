// const gulp = require('gulp');
// const browserSync = require('browser-sync').create();
// const sass = require('gulp-sass')(require('sass')); 
// const rollup = require('gulp-better-rollup'); 
// const babel = require('rollup-plugin-babel');
// const resolve = require('rollup-plugin-node-resolve'); 
// const commonjs = require('rollup-plugin-commonjs');
// const del = require('del'); 

// gulp.task('browser-sync', function() {
// 	browserSync.init({
// 		server: {
// 			baseDir: "./src/",
// 		}
// 	})
// })


// gulp.task('sass', function() {

// 	return gulp.src('./src/assets/styles/scss/**//*.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('./src/assets/styles/css/'))
// 		.pipe(browserSync.reload({stream: true})); 
// })

// gulp.task('update-scripts', function() {
// 	return gulp.src('src/assets/script/vanilla/**/*.js')
// 	.pipe(rollup({plugins: [babel(), resolve(), commonjs()]}, 'umd'))
// 	.pipe(gulp.dest('src/assets/scripts/vendors/'))
// 	.pipe(browserSync.reload({stream: true})); 
// }); 

// gulp.task('clear-scripts', function() {
// 	return del('src/assets/scripts/vendors/**/*.js');
// });

// gulp.task('scripts', gulp.series('clear-scripts', 'update-scripts'));

// gulp.task('watch', function() {
   
//     gulp.watch('src/assets/styles/scss/**/*.scss', gulp.series('sass'));
//     gulp.watch('src/**/*.html', browserSync.reload);
//     gulp.watch('src/assets/scripts/vanilla/**/*.js', gulp.series('scripts')); 
// });

// gulp.task('dev', gulp.series('sass', gulp.series('browser-sync', 'watch')));

// Définition des dépendances
const gulp = require('gulp');
const browserSync = require('browser-sync').create(); // pour créer un serveur
const sass = require('gulp-sass')(require('sass'));
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const del = require('del');

// Créer une tâche : paramètres = nom qu'on donne à la tâche, ce que la tâche fait
// Pour lancer la tâche dans le terminal : gulp (nom de la tâche)
// Attention, gulp ne fait pas de msg d'erreur pour les mauvais chemins de fichier

// Tâche test (exemple de tâche, on ne l'utilise pas dans un vrai projet)
gulp.task('test', function(done) {
    console.log('salut');
    done(); // Indique que la tâche fini ici
});
// Lancer la commande gulp test ou la mettre dans le package.json "test" et faire la commande npm run test

// Tâche browser-sync (lance le live server)
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/" // Dossier de base pour le serveur
        }
    });
});

// Tâche sass (compile le scss en css et reload le live server)
gulp.task('sass', function() {
    return gulp.src('src/assets/styles/scss/**/*.scss') // source des fichiers (** = tous les dossiers et * = tous les fichiers)
    .pipe(sass())
    .pipe(gulp.dest('src/assets/styles/css/')) // destination des fichiers (le dossier css)
    .pipe(browserSync.reload({stream: true})); // reload le live server
});

// Tâche clear-scripts (nettoye le dossier vendors)
gulp.task('clear-scripts', function() {
    return del('src/assets/scripts/vendors/**/*.js'); // supprime tous les fichiers js dans le dossier vendors
});

// Tâche update-scripts (converti ES6 en ES5 et reload le live server)
gulp.task('update-scripts', function() {
    return gulp.src('src/assets/scripts/vanilla/**/*.js') // source des fichiers qu'on veux convertir
    .pipe(rollup({plugins: [babel(), resolve(), commonjs()]}, 'umd'))
    .pipe(gulp.dest('src/assets/scripts/vendors/')) // destination des fichiers (le dossier vendors)
    .pipe(browserSync.reload({stream: true})) // relance le live server
});

// Tâche scripts (supprime les fichiers vendors, convertis les scripts et réinjecte les fichiers vendors)
gulp.task('scripts', gulp.series('clear-scripts', 'update-scripts'));

// Tâche watch (surveille les changements dans les fichiers scss, html et js)
gulp.task('watch', function() {
    // (paramètres de la fonction watch = fichiers que je veux surveiller, tâche que je veux lancer)
    gulp.watch('src/assets/styles/scss/**/*.scss', gulp.series('sass')); // surveille les styles et les compile à chaque modif, évite de relancer manuellement le compileur à chaque fois
    gulp.watch('src/**/*.html', browserSync.reload); // surveille les modifications dans le html et reload le live server
    gulp.watch('src/assets/scripts/vanilla/**/*.js', gulp.series('scripts')); // surveille les scripts et les converti à chaque modif
});

// Tâche dev (lance toutes les tâches en une seule commande)
gulp.task('dev', gulp.series('sass', gulp.parallel('browser-sync', 'watch'))); // series permet de créer une suite de tâche à lancer, parallel permet de lancer des tâches en même temps