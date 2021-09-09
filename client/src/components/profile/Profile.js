import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/avatarUser";

const Profile = () => {

    const dispatch = useDispatch()

    function avatarUploadHandler(event) {
        const file = event.target.files[0]
        dispatch(uploadAvatar(file))
    }

    function avatarDeleteHandler() {
        dispatch(deleteAvatar())
    }

    return (
        <div>
            <button onClick={avatarDeleteHandler}>Удалить аватар</button>
            <input accept={'image/*'} type='file' placeholder='Загрузить аватар' onChange={avatarUploadHandler}/>
        </div>
    );
};

export default Profile;