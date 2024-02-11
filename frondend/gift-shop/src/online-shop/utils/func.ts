

const isLogin = () => {
       const userId = localStorage.getItem('userId')
       if (!userId)
              window.location.assign('/')
}

export default isLogin