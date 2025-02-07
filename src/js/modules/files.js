// export const inputFiles = () => {
//     const inputFiles = document.querySelectorAll('input[type="file"]');

//     inputFiles.forEach((inputFile) => {
//         const dropZoneElement = inputFile.closest(".file");

//         inputFile.addEventListener("change", (e) => {

//             if (inputFile.files.length) {
//                 updateFileList(dropZoneElement, inputFile.files[0]);
//             }
//         });

//         inputFile.addEventListener("focus", (e) => {
//             inputFile.value = null;
//         });

//         dropZoneElement.addEventListener("dragover", (e) => {
//             e.preventDefault();
//             dropZoneElement.classList.add("over");
//         });

//         ["dragleave", "dragend"].forEach((type) => {
//             dropZoneElement.addEventListener(type, (e) => {
//                 dropZoneElement.classList.remove("over");
//             });
//         });

//         dropZoneElement.addEventListener("drop", (e) => {
//             e.preventDefault();

//             if (e.dataTransfer.files.length) {
//                 inputFile.files = e.dataTransfer.files;
//                 updateFileList(dropZoneElement, e.dataTransfer.files[0]);
//             }

//             dropZoneElement.classList.remove("over");
//         });
//     });

//     // document.addEventListener("click", (e) => {
//     //     const target = e.target;

//     //     if (target.classList.contains('file__preview-delete')) {
//     //         target.closest('.file__preview').previousElementSibling.classList.remove('hidden');
//     //         target.closest('.file__preview').previousElementSibling.querySelector('input').value = "";
//     //         target.closest('.file__preview').remove();
//     //     }
//     // })

//     /**
//      * Updates the thumbnail on a drop zone element.
//      *
//      * @param {HTMLElement} dropZoneElement
//      * @param {File} file
//      */

//     function updateFileList(dropZoneElement, file) {

//         let fileList = dropZoneElement.querySelector('.file__list');
//         let currentInput = dropZoneElement.querySelector('.file__input');
//         // let fileInput = currentInput.cloneNode(true);
//         // fileInput.name = 'files[]';
//         dropZoneElement.querySelector('.file__input').value = "";


//         let filePreview = document.createElement("div");
//         filePreview.classList.add("file__item");
//         let fileName = file.name;
//         filePreview.innerHTML = fileName;



//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             console.log(reader);

//             // fileInput.type = 'text';
//             // fileInput.name = 'files[]';
//             // fileInput.value = reader.result;
//         };

//         // filePreview.prepend(fileInput);


//         fileList.appendChild(filePreview);


//     }

//     // function getSize(bits) {
//     //     let size;

//     //     if (bits / 1024 < 1) {
//     //         size = bits + "B";
//     //     }

//     //     if (bits / 1024 > 1) {
//     //         if (bits / Math.pow(1024, 2) < 1) {
//     //             size = (bits / 1024).toFixed(1) + "KB";
//     //         }

//     //         if (bits / Math.pow(1024, 2) > 1) {
//     //             size = (bits / Math.pow(1024, 2)).toFixed(1) + "MB";
//     //         }
//     //     }

//     //     return size;
//     // }
// };
export const inputFiles = () => {


    $("input[type='file']").each(function (index, inputFile) {

        const dt = new DataTransfer();

        let $filesList = $(inputFile).parent().next();

        // console.log($filesList);

        $(inputFile).on('change', function (e) {

            for (var i = 0; i < this.files.length; i++) {
                // let fileBlock = $('<div/>', { class: 'file__item' }),
                //     fileName = $('<span/>', { class: 'file__item-name', text: this.files.item(i).name });
                let fileBlock = $('<div/>', { class: 'file__item' });
                let fileName = this.files.item(i).name;
                // let fileDelete = document.createElement('div');
                // fileDelete.classList.add('file-delete');
                // fileBlock.append(fileName).append(fileDelete);
                fileBlock.text(fileName);
                $filesList.append(fileBlock);

            };


            for (let file of this.files) {
                dt.items.add(file);
            }

            $filesList[0].querySelectorAll('.file__item').forEach(fileItem => {

                fileItem.addEventListener('click', function (e) {

                    let name = $(this).text();
                    $(this).remove();

                    for (let i = 0; i < dt.items.length; i++) {
                        if (name === dt.items[i].getAsFile().name) {
                            dt.items.remove(i);
                            continue;
                        }
                    }

                    inputFile.files = dt.files;
                }, {
                    once: true
                });
            });


            this.files = dt.files;


        });

    })

};
