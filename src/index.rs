use leptos::*;

use crate::icons;

/// Renders the home page of your application.
#[component]
pub(super) fn IndexPage() -> impl IntoView {
    view! {
        <section class="content">
            <Introduction />
        </section>

        <header class="header vmargin">
            <nav class="navbar container">
                <crate::nav::Nav />
            </nav>
        </header>

        <section class="content">
            <CallToContinue />
        </section>

        <hr class="content width-100" />

        <section class="content">
            <LocalAnchor name="itch".to_string() />
            <a href="https://snendev.itch.io/" target="_blank" class="row no-underline">
                <crate::icons::ItchIcon class="icon".to_string() />
                <h2>Itch.IO</h2>
            </a>
            <h3 class="maxwidth-800">
                "Many of my games are on "
                <a href="https://snendev.itch.io/">itch.io</a>
                ". Check them out!"
            </h3>
            <h4 class="maxwidth-800">
                "I also have some games hosted on "
                <a href="https://lab.snen.dev">"my \"lab\""</a>
                ", so feel free to take a look there as well."
            </h4>
            <h4 class="maxwidth-800">
                "This section will be updated more soon!"
            </h4>
        </section>

        <hr class="content width-100" />

        <section class="content">
            <LocalAnchor name="github".to_string() />
            <a href="https://github.com/snendev" target="_blank" class="row no-underline">
                <crate::icons::GithubIcon class="icon".to_string() />
                <h2>GitHub</h2>
            </a>
            <div
                class="github-card mobile-only"
                data-github="snendev"
                data-width="350"
                data-height="130"
                data-theme="default"
            />
        </section>

        <hr class="content width-100" />

        <section class="content">
            <LocalAnchor name="bsky".to_string() />
            <a href="https://bsky.app/profile/snen.dev" target="_blank" class="row no-underline">
                <crate::icons::BSkyIcon class="icon".to_string() />
                <h2>BSky</h2>
            </a>
            <bsky-embed
                username="snen.dev"
                mode="dark"
                limit="4"
                link-target="_blank"
                link-image="true"
                load-more="true"
            />
        </section>

        <hr class="content width-100" />

        <section class="content">
            <LocalAnchor name="mastodon".to_string() />
            <a href="https://mastodon.online/@snendev" target="_blank" class="row no-underline">
                <crate::icons::MastodonIcon class="icon".to_string() />
                <h2>Mastodon</h2>
            </a>
            <div class="desktop-only">
                <iframe
                    allowfullscreen
                    sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox"
                    width="500"
                    height="800"
                    src="https://mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Fmastodon.online%2Fusers%2Fsnendev&theme=dark&size=100&header=true&replies=false&boosts=false"
                />
            </div>
            <div class="mobile-only">
                <iframe
                    allowfullscreen
                    sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox"
                    width="300"
                    height="400"
                    src="https://mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Fmastodon.online%2Fusers%2Fsnendev&theme=dark&size=100&header=true&replies=false&boosts=false"
                />
            </div>
        </section>

        <hr class="content width-100" />

        <section class="content">
            <a href="mailto:me@snen.dev" target="_blank" class="row no-underline">
                <crate::icons::EmailIcon class="icon".to_string() />
                <h2>Email</h2>
            </a>
            <LocalAnchor name="email".to_string() />
            <h4 class="maxwidth-800">
                "Have questions or feedback? Want my help with business opportunities? Send a message to "
                <a href="mailto:me@snen.dev">"me@snen.dev"</a>
                " and I'll get back to you as soon as I can."
            </h4>
        </section>
    }
}

#[component]
fn Introduction() -> impl IntoView {
    view! {
        <p class="text">
            <h1>"Welcome to snen.dev!"</h1>
            <h2>"My name is Sean, but friends call me Snen. 😀"</h2>
            <h3>"I make software, games, and opinions."</h3>
        </p>
    }
}

#[component]
fn StatementOne() -> impl IntoView {
    view! {
        <h4>
            "The modern tech era prioritizes engagement over what users actually want. Let’s build better, safer software to solve real problems that impact real people."
        </h4>
    }
}

#[component]
fn StatementTwo() -> impl IntoView {
    view! {
        <h4>
            "Games provide a medium for people to connect and express themselves in entirely unique ways. Let’s build games that help us practice creativity and connect with those around us."
        </h4>
    }
}

#[component]
fn CallToContinue() -> impl IntoView {
    view! {
        <div class="center">
            <p class="subtle">
                <em>"See the more of my stuff below."</em>
            </p>
            <a href="#bsky" class="icon-link no-underline">
                <icons::DownIcon class="icon".to_string() />
            </a>

        </div>
    }
}

#[component]
fn LocalAnchor(name: String) -> impl IntoView {
    view! {
        <div>
            <div id={name.clone()} name={name} class="hidden offset-anchor" />
        </div>
    }
}
