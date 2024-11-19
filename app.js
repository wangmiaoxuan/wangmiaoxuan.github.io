const auth = firebase.auth();
const db = firebase.database();

// 绑定按钮点击事件
document.getElementById('login-btn').addEventListener('click', signInWithGoogle);

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider(); // 创建 Google 登录提供者
  try {
    // 弹出 Google 登录窗口
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    // 获取用户信息
    const userInfo = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: new Date().toISOString(),
    };

    // 检查用户是否已注册
    const userRef = db.ref(`users/${user.uid}`);
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      // 用户已注册，更新最后登录时间
      await userRef.update({ lastLogin: userInfo.lastLogin });
      alert("登录成功！");
    } else {
      // 用户未注册，保存信息到数据库
      await userRef.set(userInfo);
      alert("注册成功！");
    }

    // 显示用户信息
    displayUserInfo(userInfo);
  } catch (error) {
    console.error("Google 登录失败:", error);
    alert("登录失败，请重试！");
  }
}

// 显示用户信息
function displayUserInfo(userInfo) {
  document.getElementById('user-info').innerHTML = `
    <p><strong>姓名：</strong>${userInfo.name}</p>
    <p><strong>Email：</strong>${userInfo.email}</p>
    <img src="${userInfo.photoURL}" alt="User Photo" style="width: 100px; height: 100px;">
    <p><strong>最后登录时间：</strong>${userInfo.lastLogin}</p>
  `;
}
