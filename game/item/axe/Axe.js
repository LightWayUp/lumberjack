/**
 * @license
 * Copyright (c) 2019 vanished
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

const StoreItem = require("../StoreItem.js");
const Durability = require("./Durability.js");
const {t} = require("../../../utility/Type.js");

/**
 * @abstract
 */
class Axe extends StoreItem {

    constructor(pojo) {

        if (!(pojo == null || t(pojo, "object"))) {
            throw new TypeError("Incorrect type for Axe argument!");
        }

        super();
        this.durability = pojo ? new Durability(pojo.durability) :
            new Durability(...Object.values(this.getItemDetails().durability));
    }

    cut() {

        this.durability.decrease();
        return this;
    }

    /**
     * @override
     */
    isValid() {

        try {
            const durabilityValue = this.durability.value;
            return durabilityValue >= 0 && durabilityValue <= Math.max(...Object.values(this.getItemDetails().durability));
        } catch (error) {
            return false;
        }
    }

    isBroken() {
        return this.durability.value <= 0;
    }

    /**
     * @override
     */
    toJSON() {

        const object = super.toJSON();
        object.durability = this.durability;
        return object;
    }

    /**
     * @override
     */
    isAbstract() {
        return this.constructor === Axe;
    }
}

module.exports = Axe;
