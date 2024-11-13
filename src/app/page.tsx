import Script from "next/script";
import './home.css';

export default function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#">CSU-OFX Manager</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">Recursos</a>
              </li>
              {/* <li className="nav-item">
                  <a className="nav-link" href="#pricing">Preços</a>
                </li>  */}
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contato</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ues">Entrar</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <!-- Hero Section --> */}
      <section className="hero-section">
        <div className="container">
          <h1>Organize e Processe Seus Extratos Bancários OFX com Facilidade</h1>
          <p>Importe, analise e gerencie seus arquivos OFX de extratos bancários em um único lugar.</p>
          <a href="/ues" className="btn btn-light btn-lg mt-3">Entrar no CSU-OFX Manager</a>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      <section id="features" className="py-5">
        <div className="container text-center">
          <h2 className="mb-5">Recursos Principais</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-upload feature-icons mb-3"></i>
                <h4>Importação de Arquivos OFX</h4>
                <p>Carregue seus extratos bancários no formato OFX em poucos cliques.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-calculator feature-icons mb-3"></i>
                <h4>Lançamentos Manuais</h4>
                <p>Realize lançamentos financeiros manualmente de forma simples rápida e prática.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-chart-line feature-icons mb-3"></i>
                <h4>Visualização e Análise de Dados</h4>
                <p>Obtenha insights financeiros rápidos de forma interativa.</p>
                {/* <!--<p>Obtenha insights financeiros rápidos com gráficos interativos.</p>--> */}
              </div>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-list-check feature-icons mb-3"></i>
                <h4>Gerenciamento Completo</h4>
                {/* <!--<p>Organize suas transações, categorize e exporte relatórios financeiros.</p>--> */}
                <p>Organize suas transações, categorize e analise seus dados financeiros.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-users feature-icons mb-3"></i>
                <h4>Convite para Acesso</h4>
                <p>Convide outros usuários a acessar os dados de uma unidade econômica.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-users-gear feature-icons mb-3"></i>
                <h4>Gerenciamento de Acessos</h4>
                <p>Gerencie o acesso, liberando permissões de leitura, gravação e importação.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <!-- Pricing Section --> */}
      <section id="pricing" className="bg-light py-5">
        <div className="container text-center">
          {/* <!--<h2 className="mb-5">Planos e Preços</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Plano Básico</h4>
                    <p className="card-text">Ideal para usuários iniciantes. Inclui funcionalidades essenciais.</p>
                    <h5>R$ 29,90/mês</h5>
                    <a href="#" className="btn btn-primary">Assine Agora</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Plano Profissional</h4>
                    <p className="card-text">Para usuários que necessitam de mais recursos e suporte.</p>
                    <h5>R$ 49,90/mês</h5>
                    <a href="#" className="btn btn-primary">Assine Agora</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Plano Empresarial</h4>
                    <p className="card-text">Soluções avançadas para grandes empresas com suporte personalizado.</p>
                    <h5>R$ 99,90/mês</h5>
                    <a href="#" className="btn btn-primary">Assine Agora</a>
                  </div>
                </div>
              </div>
            </div>--> */}
        </div>
      </section>

      {/* <!-- Footer Section --> */}
      <footer className="footer">
        <p>&copy; 2024 CSU-OFX Manager. Todos os direitos reservados.</p>
        <p><a id="contact" href="mailto:luisfj_pr@hotmail.com">Entre em contato</a>
          {/* <!--| <a href="#">Política de Privacidade</a>--> */}
        </p>
      </footer>

      {/* <!-- Bootstrap JS --> */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></Script>
    </>
  );
}
