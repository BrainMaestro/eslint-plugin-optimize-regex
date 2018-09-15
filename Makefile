.PHONY: test

test:
	docker build --force-rm -t eslint-plugin-optimize-regex .

exec:
	docker run --rm -it eslint-plugin-optimize-regex sh
