const pupeprteer = require("puppeteer");

async function scarpAgro() {
  const browser = await pupeprteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.tiendasjumbo.co/supermercado/frutas-y-verduras");

  const dataUrls = await page.evaluate(() => {
    const urls = [];
    const urlsProdust = document.querySelectorAll(
      ".product-item .product-item__bottom .product-item__info a"
    );
    for (const url of urlsProdust) {
      urls.push(url.href);
    }
    return urls;
  });
  const products = [];
  for (let urlReferen of dataUrls) {
    await page.goto(urlReferen);
    const product = await page.evaluate(() => {
      const srcQuery =
        ".product-info .image-wrapper .image .apresentacao #show #include #image a ";
      const nameQuery = ".product-info .info-wrapper .name h1 div";
      const markertQuery =
        ".product-info .info-wrapper .aditional-info .brand div a";
      const priceQuery =
        ".is-available .product-prices__wrapper .plugin-preco .descricao-preco .valor-por strong";
      const descQuery = ".description .productDescription";
      const dataProduct = {};
      dataProduct.name = document.querySelector(nameQuery).innerText;
      dataProduct.markert = document.querySelector(markertQuery).innerText;
      dataProduct.price = document.querySelector(priceQuery).innerText;
      dataProduct.src = document.querySelector(srcQuery).href;
      dataProduct.description = document.querySelector(descQuery).innerText;
      return dataProduct;
    });
    products.push(product);
  }

  console.log(products);
  await browser.close();
}
scarpAgro();
