// composables/useFormValidation.js
import { ref } from 'vue';

export default function useImageValidate() {
    const image = ref<File>();
    const imageError = ref<string|null>(null);
    const imagePreview = ref<string | null>(null);

    const imageFileValidation = (value:any) => {
        if (!value) return true;

        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = value.name.split('.').pop().toLowerCase();

        if (!allowedExtensions  .includes(fileExtension)) {
            imageError.value = 'Please, provide a valid image file.';
            return false;
        }

        imageError.value = null;
        return true;
    };

    const handleFileUpload = (e:any) => {
        const file = e.target.files[0];
        imageFileValidation(file);
        image.value = file;
        imagePreview.value = URL.createObjectURL(file);

    };

    return {
        image,
        imageError,
        handleFileUpload,
        imagePreview,
        
    };
}