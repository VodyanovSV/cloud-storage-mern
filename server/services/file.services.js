import path from 'path'
import config from 'config'
import fs from 'fs'

class FileServices {
    createDir(file) {
        return new Promise((resolve, reject) => {
            try {
                const filePath = this.getPath(file)
                if (fs.existsSync(filePath)) {
                    throw new Error('Файл уже существует')
                }
                fs.mkdirSync(filePath)
                resolve({message: 'Файл успешно создан'})
            } catch (e) {
                console.log('Ошибка в fileServices.createDir: ', e.message)
                reject({message: 'Что-то пошло не так'})

            }
        })
    }

    deleteFile(file) {
        const filePath = this.getPath(file)
        if(file.type === 'dir'){
            fs.rmdirSync(filePath)
        }else {
            fs.unlinkSync(filePath)
        }
    }
	
	
	
}

export default new FileServices()