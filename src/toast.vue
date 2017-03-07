<template>
    <span></span>
</template>
<style>
    #toasted-container {
        display: block;
        position: fixed;
        z-index: 10000;
    }

    @media only screen and (max-width: 600px) {
        #toasted-container {
            min-width: 100%;
            bottom: 0%;
        }
    }

    @media only screen and (min-width: 601px) and (max-width: 992px) {
        #toasted-container {
            max-width: 90%;
        }
    }

    @media only screen and (min-width: 993px) {
        #toasted-container {
            max-width: 86%;
        }

        #toasted-container.top-right {
            top: 10%;
            right: 7%;
        }

        #toasted-container.top-left {
            top: 10%;
            left: 7%;
        }

        #toasted-container.bottom-right {
            right: 5%;
            bottom: 7%;
        }

        #toasted-container.bottom-left {
            left: 5%;
            bottom: 7%;
        }

        #toasted-container.top-left .toasted, #toasted-container.bottom-left .toasted{
            float: left;
        }

    }

    .toasted {
        top: 35px;
        width: auto;
        clear: both;
        margin-top: 10px;
        position: relative;
        max-width: 100%;
        height: auto;
        word-break: break-all;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .toasted .btn,
    .toasted .btn-flat {
        margin: 0;
        margin-left: 3rem;
    }

    .toasted.rounded {
        border-radius: 24px;
    }

    @media only screen and (max-width: 600px) {
        .toasted {
            width: 100%;
            border-radius: 0;
        }
    }

    @media only screen and (min-width: 601px) and (max-width: 992px) {
        .toasted {
            float: left;
        }
    }

    @media only screen and (min-width: 993px) {
        .toasted {
            float: right;
        }
    }

    /* Templates*/

    /* Primary Style of Toast */
    .toasted.primary {
        border-radius: 2px;
        min-height: 38px;
        line-height: 1.1em;
        background-color: #353535;
        padding: 0 20px;
        font-size: 15px;
        font-weight: 300;
        color: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .toasted.primary.success {
        background: #4CAF50;
    }
    .toasted.primary.error {
        background: #F44336;
    }
    .toasted.primary.info {
        background : #3F51B5;
    }

    /* Bubble */
    .toasted.bubble {
        border-radius: 30px;
        min-height: 38px;
        line-height: 1.1em;
        background-color: #FF7043;
        padding: 0 20px;
        font-size: 15px;
        font-weight: 300;
        color: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .toasted.bubble.success {
        background: #4CAF50;
    }
    .toasted.bubble.error {
        background: #F44336;
    }
    .toasted.bubble.info {
        background : #3F51B5;
    }

    /* Outline */

    .toasted.outline {
        border-radius: 30px;
        min-height: 38px;
        line-height: 1.1em;
        background-color: white;
        border: 1px solid #676767;
        padding: 0 20px;
        font-size: 15px;
        color: #676767;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        font-weight: bold;
    }

    .toasted.outline.success {
        color: #4CAF50;
        border-color: #4CAF50;
    }
    .toasted.outline.error {
        color: #F44336;
        border-color: #F44336;
    }
    .toasted.outline.info {
        color: #3F51B5;
        border-color: #3F51B5;
    }
</style>