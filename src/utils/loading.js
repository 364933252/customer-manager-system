import { Loading } from "element-ui";

export const apiLoading = true

let loadingConfig = {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.4)'
}

let loading = null

export const loadingShow = () => {
    loading = Loading.service(loadingConfig)
}

export const loadingHide = () => {
    loading.close()
}