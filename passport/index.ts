import passport from "passport";
import local from "./localStrategy";
export default function passportInit() {
    passport.initialize();
    local();
}
