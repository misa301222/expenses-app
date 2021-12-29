import AuthForm from "../auth/auth-form";

function StartingPageContent() {
  return (
    <div className="container">
      <h1 className="text-center">Welcome to Expenses App :[</h1>
      <AuthForm />
    </div>
  );
}

export default StartingPageContent;