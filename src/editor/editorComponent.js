import aceComponent from './aceComponent';
export default editorPage;

var editorPage = {
	controller: function(args){
		var file = args.file;

		var ctrl = {
			file: file,
			content:file.content,
			save: file.save,
			play: play
		};

		return ctrl;

		function play(){
			var playground;

			playground = window.open('playground.html', 'Playground');

			playground.onload = function(){
				// first set the unload listener
				playground.addEventListener('unload', function() {
					// get focus back here
					window.focus();
				});

				// then activate the player (this ensures that when )
				playground.activate(file);
				playground.focus();
			};

		}
	},

	view: function(ctrl){
		return m('.editor', [
			m('.btn-toolbar', [
				m('.btn-group', [
					m('a.btn.btn-secondary', {onclick: ctrl.save},[
						m('strong.fa.fa-play')
					]),
					m('a.btn.btn-secondary', {onclick: ctrl.play},[
						m('strong.fa.fa-save')
					])
				])
			]),
			m.component(aceComponent, {content:ctrl.content})
		]);
	}
};