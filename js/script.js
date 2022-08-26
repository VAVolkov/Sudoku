'use strict'

class Game {
    constructor() {

        this.imageGallery = document.querySelector('.images');
        this.images = document.querySelectorAll('.imgBank');
        this.playingField = document.querySelector('.playingField');
        this.playingFieldWindows = this.playingField.querySelectorAll('img');
        this.header = document.querySelector('h1');
        this.emptyImage = document.querySelectorAll('.emptyImage');

        this.arrayImageLevelFirst = ['./img/fig01.png', './img/fig02.png', './img/fig03.png', './img/fig04.png'];

        this.arrayImageLevelSecond = ['./img/fig05.png', './img/fig06.png', './img/fig07.png', './img/fig08.png'];

        this.flag = false;
        this.galleryImage = [];
        this.propetyImage = [];
        this.indexImage;
        this.currentPropetyImage;
        this.currentImage;
        this.copyImage;
        this.level2=false;

        this.propetyWindowsPlayingField = [];

        this.initCoord = {};

        this.array = [];
    }

    initArray() {
        for (let i = 0; i < 16; i++) {
            this.array[i] = undefined;
        }
    }

    getPropetyImage() {
        this.images.forEach((item) => {
            this.propetyImage.push(item.getBoundingClientRect());
        })
    }

    getPropetyPlayingFields() {
        this.playingFieldWindows.forEach((item) => {
            this.propetyWindowsPlayingField.push(item.getBoundingClientRect());
        })
    }

    getCurrentImage() {
        for (let i = 0; i < this.propetyImage.length; i++) {
            if (this.coord.x >= this.propetyImage[i].left && this.coord.x <= this.propetyImage[i].right &&
                this.coord.y >= this.propetyImage[i].top && this.coord.y <= this.propetyImage[i].bottom) {
                return this.images[i];
            }
        }
    }

    getIndexOfImage() {
        for (let i = 0; i < this.images.length; i++) {
            if (this.currentImage == this.images[i]) {
                return i;
            }
        }
    }

    work() {

        this.imageGallery.addEventListener('mousedown', (even) => {
            this.coord = {
                x: even.pageX,
                y: even.pageY
            };
            this.initCoord = this.coord;
            this.currentImage = this.getCurrentImage();
            let path = this.currentImage.src.split('/');
            this.currentImageSrc = "./img/"+path[path.length-1];
        });


        document.addEventListener('mouseup', (event) => {

            for (let i = 0; i < this.propetyWindowsPlayingField.length; i++) {
                if (event.pageX >= this.propetyWindowsPlayingField[i].left && event.pageX <= this.propetyWindowsPlayingField[i].right &&
                    event.pageY >= this.propetyWindowsPlayingField[i].top && event.pageY <= this.propetyWindowsPlayingField[i].bottom) {
                    this.playingFieldWindows[i].src = this.currentImageSrc;

                    if (this.currentImageSrc == this.arrayImageLevelFirst[0] || this.currentImageSrc == this.arrayImageLevelSecond[0]) {
                        this.array[i] = 1;
                    } else if (this.currentImageSrc == this.arrayImageLevelFirst[1] || this.currentImageSrc == this.arrayImageLevelSecond[1]) {
                        this.array[i] = 2;
                    } else if (this.currentImageSrc == this.arrayImageLevelFirst[2] || this.currentImageSrc == this.arrayImageLevelSecond[2]) {
                        this.array[i] = 3;
                    } else if (this.currentImageSrc == this.arrayImageLevelFirst[3] || this.currentImageSrc == this.arrayImageLevelSecond[3]) {
                        this.array[i] = 4;
                    }
                    this.check();
                }
            }
        });
    }

    isFull(item) {
        return item != undefined;
    }

    letStartLevelSecond(){
        this.header.textContent = "LEVEL 2";
        for(let i = 0; i<this.images.length; i++){
            this.images[i].src = this.arrayImageLevelSecond[i];
        }
        console.dir(this.images);
        for(let i = 0; i<this.emptyImage.length; i++){
            this.emptyImage[i].src = "./img/fig0_white.png";
        }
        this.initArray();
    }

    check() {
        if (this.array.every(this.isFull)) {

            let row1Sum = this.array[0] + this.array[1] + this.array[2] + this.array[3];
            let row2Sum = this.array[4] + this.array[5] + this.array[6] + this.array[7];
            let row3Sum = this.array[8] + this.array[9] + this.array[10] + this.array[11];
            let row4Sum = this.array[12] + this.array[13] + this.array[14] + this.array[15];

            let column1Sum = this.array[0] + this.array[4] + this.array[8] + this.array[12];
            let column2Sum = this.array[1] + this.array[5] + this.array[9] + this.array[13];
            let column3Sum = this.array[2] + this.array[6] + this.array[10] + this.array[14];
            let column4Sum = this.array[3] + this.array[7] + this.array[11] + this.array[15];

            let message;
            (this.level2)?(message="Вы выиграли!"):(message="Вы выиграли! Хотите продолжить игру?");

            let result;
            if (row1Sum == 10 && row2Sum == 10 && row3Sum == 10 && row4Sum == 10 &&
                column1Sum == 10 && column2Sum == 10 && column3Sum == 10 && column4Sum == 10) {
                result = confirm(message);
            } else {
                alert('Вы проиграли!');
            }

            if (result) {
                this.level2 = true;
                this.letStartLevelSecond();
                row1Sum = 0; row2Sum = 0; row3Sum = 0; row4Sum = 0;
                column1Sum = 0; column2Sum = 0; column3Sum = 0; column4Sum = 0;
            }
        }
    }
        

    init() {
        this.initArray();
        this.getPropetyImage();
        this.getPropetyPlayingFields();
        this.work();
    }
}






