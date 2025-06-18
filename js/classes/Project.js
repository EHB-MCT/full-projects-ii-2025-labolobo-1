// blogposts
// also articles, same structure

import Txt from "./Txt.js";
export default class Project extends Txt {
  constructor(_nl, _fr, _nlTitle, _frTitle, _nlSub, _frSub, _img) {
    super(_nl, _fr);
    this._nlTitle = _nlTitle;
    this._frTitle = _frTitle;
    this._nlSub = _nlSub;
    this._frSub = _frSub;
    this._img = _img;
  }
}
