use leptos::*;
use leptos_meta::*;
use leptos_router::*;

#[cfg(feature = "ssr")]
mod fallback;
mod icons;
mod index;
mod nav;

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();

    view! {
        <Link rel="shortcut icon" type_="image/ico" href="/public/favicon.ico"/>
        <Stylesheet id="leptos" href="/public/global.css" />
        <Title text="snen.dev" />
        <Script src="https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js" async_="async" />
        <Script src="//cdn.jsdelivr.net/github-cards/latest/widget.js" async_="async" />
        <Router>
            <main class="main container">
                <Routes>
                    <Route path="" view=index::IndexPage />
                </Routes>
            </main>
        </Router>
    }
}

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    console_error_panic_hook::set_once();
    leptos::mount_to_body(App);
}

#[cfg(feature = "ssr")]
mod ssr_imports {
    use crate::App;
    use axum::{routing::post, Router};
    use leptos::*;
    use leptos_axum::{generate_route_list, LeptosRoutes};
    use log::{info, Level};
    use wasm_bindgen::prelude::wasm_bindgen;

    #[wasm_bindgen]
    pub struct Handler(axum_js_fetch::App);

    #[wasm_bindgen]
    impl Handler {
        pub async fn new() -> Self {
            _ = console_log::init_with_level(Level::Debug);
            console_error_panic_hook::set_once();

            let leptos_options = LeptosOptions::builder()
                .output_name("client")
                .site_pkg_dir("pkg")
                .build();
            let routes = generate_route_list(App);

            // build our application with a route
            let app: axum::Router<()> = Router::new()
                .leptos_routes(&leptos_options, routes, App)
                .route("/api/*fn_name", post(leptos_axum::handle_server_fns))
                .with_state(leptos_options);

            info!("creating handler instance");

            Self(axum_js_fetch::App::new(app))
        }

        pub async fn serve(&self, req: web_sys::Request) -> web_sys::Response {
            self.0.oneshot(req).await
        }
    }
}
