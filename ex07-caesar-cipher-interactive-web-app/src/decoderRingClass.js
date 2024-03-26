// decoder is a base class that operates on a substitution cipher the input to
// the constructor is the substitution string, which should contain all
// lower-case letters in some order. e.g., let d = new
// decoder('nopqrstuvwxyzabcdefghijklm'); implements ROT13.

class decoder {
  constructor(cipher) {
    this._cipher = cipher;
    this._rebuildMaps();
  }

  get cipher() {
    return this._cipher;
  }
  _rebuildMaps() {
    this._encodeMap = {};
    this._decodeMap = {};
    this._cipher.split("").forEach((ch, index) => {
      this._encodeMap[String.fromCharCode(index + 97)] = ch;
      this._decodeMap[ch] = String.fromCharCode(index + 97);
    });
  }

  set cipher(newcipher) {
    this._cipher = newcipher;
    this._rebuildMaps();
  }

  encode(str) {
    let s = str.split("").map((x) => {
      if (x in this._encodeMap) {
        return this._encodeMap[x];
      } else {
        return x;
      }
    });
    return s.join("");
  }

  decode(str) {
    let s = str.split("").map((x) => {
      if (x in this._decodeMap) {
        return this._decodeMap[x];
      } else {
        return x;
      }
    });
    return s.join("");
  }
}

// now the decoderRing is just a subclass of decoder that initializes it with a
// rotated string
class decoderRing extends decoder {
  constructor(rotation) {
    let chars = [];
    for (let i = 0; i < 26; i++) {
      chars.push(String.fromCharCode(97 + ((i + rotation) % 26)));
    }
    super(chars.join(""));
  }
}

// TASK #2: export the decoder class
export { decoder };

