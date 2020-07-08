window["messageBox"] = {
	error: function (title, timeout, onClose) {
		new Noty({
			type: "error",
			layout: "topCenter",
			text: title,
			timeout: !timeout? 3000: timeout,
			progressBar: true,
			callbacks: {
				onClose: function () {
					if (onClose) onClose();
				}
			}
		}).show();
	},
	warning: function (title, timeout, onClose) {
		new Noty({
			type: "warning",
			layout: "topCenter",
			text: title,
			timeout: !timeout? 3000: timeout,
			progressBar: true,
			callbacks: {
				onClose: function () {
					if (onClose) onClose();
				}
			}
		}).show();
	},
	success: function (title, timeout, onClose) {
		new Noty({
			type: "success",
			layout: "topCenter",
			text: title,
			timeout: !timeout? 3000: timeout,
			progressBar: true,
			callbacks: {
				onClose: function () {
					if (onClose) onClose();
				}
			}
		}).show();
	},
	info: function (title, timeout, onClose) {
		new Noty({
			type: "info",
			layout: "topCenter",
			text: title,
			timeout: !timeout? 3000: timeout,
			progressBar: true,
			callbacks: {
				onClose: function () {
					if (onClose) onClose();
				}
			}
		}).show();
	},
	confirm: function (title, accept, cancel) {
		const dialog = new Noty({
			text: title,
			layout: "center",
			modal: true,
			buttons: [
				Noty.button('YES', 'btn btn-success px-4 mx-2', function () {
					if (accept) accept();
					dialog.close();
				}, { id: 'button1', 'data-status': 'ok' }),

				Noty.button('NO', 'btn btn-secondary px-3', function () {
					if (cancel) cancel();
					dialog.close();
				})
			]
		}).show();
	}
};