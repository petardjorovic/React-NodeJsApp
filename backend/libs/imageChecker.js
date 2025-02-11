const imageTypeChecker = (image) => {
  const KB = 1024;
  const MB = KB * 1024;
  const base64Data = image;
  let imageType = "";
  const imageSize = Buffer.byteLength(base64Data, "base64").toFixed(2);

  const imageBuffer = Buffer.from(image.split(",")[1], "base64");
  // Proveravamo JPG/JPEG (FF D8 FF na početku i FF D9 na kraju)
  if (
    imageBuffer[0] === 0xff &&
    imageBuffer[1] === 0xd8 &&
    imageBuffer[2] === 0xff
  ) {
    imageType = "jpeg"; // Ovo se koristi za oba JPG i JPEG
  }

  // Proveravamo PNG (89 50 4E 47 0D 0A 1A 0A na početku)
  if (
    imageBuffer[0] === 0x89 &&
    imageBuffer[1] === 0x50 &&
    imageBuffer[2] === 0x4e &&
    imageBuffer[3] === 0x47 &&
    imageBuffer[4] === 0x0d &&
    imageBuffer[5] === 0x0a &&
    imageBuffer[6] === 0x1a &&
    imageBuffer[7] === 0x0a
  ) {
    imageType = "png";
  }

  return imageType && imageSize < MB * 1;
};

module.exports = imageTypeChecker;
