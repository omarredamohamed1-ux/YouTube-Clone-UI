// Toggle menu panels when clicking menu buttons.
// Matches elements with id="menu btn" (space), id="menu-btn", class .menu-btn, or [data-menu-btn].
(function () {
	const selectors = ['#menu-btn', '.menu-btn', '[data-menu-btn]', '[id="menu btn"]'].join(',');

	function initMenuButtons() {
		const buttons = document.querySelectorAll(selectors);
		buttons.forEach(btn => {
			btn.setAttribute('role', 'button');
			if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
			btn.addEventListener('click', () => toggleMenu(btn));
			btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(btn); } });
		});
	}

	function toggleMenu(btn) {
		const targetSelector = btn.getAttribute('data-menu-target') || btn.getAttribute('aria-controls') || btn.getAttribute('data-target');
		let menu = targetSelector ? document.querySelector(targetSelector) : null;
		if (!menu) menu = btn.nextElementSibling;
		// Fallback to the main sidebar if no explicit target found
		if (!menu) menu = document.querySelector('aside');

		btn.classList.toggle('open');
		if (menu) menu.classList.toggle('open');

		const expanded = btn.getAttribute('aria-expanded') === 'true';
		btn.setAttribute('aria-expanded', String(!expanded));
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMenuButtons);
	} else {
		initMenuButtons();
	}
})();

