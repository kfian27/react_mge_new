import Swal from "sweetalert2";

export const alertSuccess = async (configAlert = {}) => {
  let title = configAlert.title || "Success";
  let subTitle = configAlert.subTitle || "Data berhasil disimpan";
  return await Swal.fire({
    title: title,
    text: subTitle,
    icon: "success",
  });
};

export const alertWarning = async (configAlert = {}) => {
  let title = configAlert.title || "Gagal";
  let subTitle = configAlert.subTitle || "Data gagal disimpan";
  return await Swal.fire({
    title: title,
    text: subTitle,
    icon: "warning",
  });
};

export const alertConfirmation = async (configAlert = {}) => {
  let title = configAlert.title || "Apakah Anda yakin ?";
  let subTitle = configAlert.subTitle || "Data tidak dapat dikembalikan !";
  let confirmButtonText = "Ya, Saya yakin!";
  let cancelButtonText = "Tidak";
  return await Swal.fire({
    title: title,
    text: subTitle,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });
};
