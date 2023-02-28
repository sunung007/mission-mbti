import "./AdminPage.css";

export default function AdminLoginPage() {
  const login = (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
    console.log(e.target.value);

    return false;
  };

  return (
    <div id="AdminPage" className="page">
      <div className="title">관리자 페이지에 접속하셨습니다</div>

      <form className="login-form" onSubmit={(e) => login(e)}>
        <input type={"password"} placeholder="비밀번호를 입력하세요" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
