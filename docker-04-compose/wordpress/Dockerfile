FROM wordpress:7.1.3-php8.4-apache
COPY uploads.ini /usr/local/etc/php/conf.d/contdel-uploads.ini
HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=10 CMD php -r "exit(@file_get_contents('http://127.0.0.1/wp-includes/version.php') === false ? 1 : 0);"
