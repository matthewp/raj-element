.PHONY: serve dev

BABEL=node_modules/.bin/BABEL

all: raj.js

raj.js: node_modules/raj/runtime.js
	$(BABEL) node_modules/raj/runtime.js -o raj.js

serve:
	http-server -p 8011

dev: serve
