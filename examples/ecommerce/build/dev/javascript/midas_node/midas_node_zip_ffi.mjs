import { BitArray } from "./gleam.mjs";
import * as zip from "@zip.js/zip.js";

export async function zipItems(items) {
  const zipFileWriter = new zip.BlobWriter();
  const zipWriter = new zip.ZipWriter(zipFileWriter);

  for (const [file, bitArray] of items) {
    // Why blob
    // why list when making a blob
    const reader = new zip.BlobReader(new Blob([bitArray.buffer]))
    await zipWriter.add(file, reader);
  }
  await zipWriter.close()
  const blob = await zipFileWriter.getData()
  const done = new BitArray(new Uint8Array(await blob.arrayBuffer()));
  return done
}