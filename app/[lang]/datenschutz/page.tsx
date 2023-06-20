import React, { ReactNode } from 'react'

export const Headline = ({ children, title }: { children: ReactNode, title: string }) => {
    return (
        <>
            <h2 className="mb-4 mt-8 text-lg">{title}</h2>
            {children}
        </>
    )
}

export const Text = ({ text }: { text: string }) => {
    return <p className="mb-2">{text}</p>
}

const DataPrivacyPage = () => {
    return (
        <>
            <header>
                <h1 className="my-4 lg:mb-16 lg:mt-12 text-6xl lg:text-8xl text-center font-text">Datenschutz</h1>
            </header>
            <main className="mx-8 lg:mx-auto mb-8 lg:mb-16 lg:max-w-screen-xl font-text">
                <Headline title={"Datensammlung"}>
                    <Text text={"Wir sammeln nur Ihre E-Mail-Adresse, wenn Sie unseren Newsletter abonnieren möchten. Wir verwenden diese E-Mail-Adresse ausschließlich zum Zwecke des Newsletter-Versands. Wir speichern die E-Mail-Adresse, die Sie uns zur Verfügung stellen, auf unserem Server und nutzen den E-Mail-Service Dritter (wie beispielsweise Mailchimp), um unseren Newsletter zu versenden. Wir verkaufen Ihre E-Mail-Adresse nicht an Dritte und geben sie auch nicht weiter."} />
                    <Text text={"Wenn Sie unsere Website besuchen, erfassen wir automatisch Informationen über Sie und Ihr Gerät, einschließlich IP-Adresse, Gerätetyp, Browsertyp und -version sowie Betriebssystem. Wenn Sie unsere Website verwenden, können wir auch Cookies und ähnliche Technologien nutzen, um Informationen über Ihre Nutzung der Website, für Marketingzwecke oder zur statistischen Auswertung zu erfassen. Nähere Informationen zu Cookies und wie Sie diese deaktivieren können, finden Sie in unserer Cookie-Richtlinie."} />
                    <Text text={"Wir nutzen auch Dienste von Drittanbietern wie beispielsweise Google Analytics und Vercel Analytics, um Informationen über die Nutzung unserer Website zu sammeln und zu analysieren. Diese Dienste verwenden Cookies und ähnliche Technologien, um Informationen über Ihre Nutzung unserer Website zu sammeln und zu analysieren. Nähere Informationen zu den Nutzungsbedingungen dieser Drittanbieter finden Sie auf deren jeweiligen Websites."} />
                </Headline>
                <Headline title={"Affiliate-Links"}>
                    <Text text={"Wir können Affiliate-Links auf unserer Website verwenden, um Produkte oder Dienstleistungen Dritter zu bewerben und ggf. eine Provision zu verdienen. Wenn Sie auf einen Affiliate-Link klicken und anschließend ein Produkt oder eine Dienstleistung erwerben, erhalten wir eine Provision."} />
                </Headline>
                <Headline title={"Analytics"}>
                    <Text text={"Wir nutzen Analytics-Tools von Drittanbietern wie Google Analytics und Vercel Analytics, um Informationen über die Nutzungunserer Website zu sammeln und zu analysieren. Diese Dienste verwenden Cookies und ähnliche Technologien, um Informationen über Ihre Nutzung der Website zu sammeln und zu analysieren. Die Daten, die wir über die Analytics-Tools sammeln, dienen dazu, unsere Website zu verbessern und unseren Nutzern eine bessere Erfahrung zu bieten. Die erhobenen Daten werden anonymisiert und aggregiert, so dass keine Rückschlüsse auf einzelne Nutzer möglich sind."} />
                </Headline>
                <Headline title={"Social-Media-Links"}>
                    <Text text={"Wir haben Links zu unseren Social-Media-Kanälen auf unserer Website. Wenn Sie auf einen Deiner Social-Media-Kanäle klicken, werden Sie auf die entsprechende Social-Media-Website weitergeleitet. Wir sind nicht verantwortlich für die Datenschutzpraktiken dieser Websites."} />
                </Headline>
                <Headline title={"Ihre Rechte"}>
                    <Text text={"Sie haben das Recht, jederzeit Auskunft über die personenbezogenen Daten, die wir von Ihnen gespeichert haben, zu erhalten und diese gegebenenfalls berichtigen, löschen oder einschränken zu lassen. Sie haben auch das Recht, Ihre Einwilligung zur Verarbeitung Ihrer personenbezogenen Daten jederzeit zu widerrufen. Bitte kontaktieren Sie uns, wenn Sie Fragen zu unseren Datenschutzpraktiken haben oder wenn Sie Ihre Rechte als betroffene Person ausüben möchten."} />
                </Headline>
                <Headline title={"Datensicherheit"}>
                    <Text text={"Wir ergreifen angemessene Maßnahmen, um die Sicherheit Ihrer Daten zu gewährleisten und sie vor unbefugten Zugriffen und Verlust zu schützen. Wir nutzen dabei technische und organisatorische Maßnahmen, um Ihre Daten zu schützen."} />
                </Headline>
                <Headline title={"Änderungen an der Datenschutzerklärung"}>
                    <Text text={"Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die aktuelle Version der Datenschutzerklärung wird auf unserer Website veröffentlicht."} />
                </Headline>
                <Headline title={"Kontakt"}>
                    <Text text={"Wenn Sie Fragen zur Datenschutzerklärung haben oder Ihre Rechte als betroffene Person ausüben möchten, kontaktieren Sie uns bitte unter info@thebutcheress.com."} />
                    <Text text={"Bitte beachten Sie, dass Datenübertragungen im Internet nie vollständig sicher sein können und dass wir trotz aller Vorkehrungen keine absolute Sicherheit garantieren können."} />
                </Headline>
                <Headline title={"Hinweis zur Cookie-Richtlinie"}>
                    <Text text={"Unsere Website verwendet Cookies und ähnliche Technologien, um Ihre Nutzungserfahrung zu verbessern und um uns zu helfen, unsere Website besser zu verstehen und zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Computer oder mobilen Gerät gespeichert werden, wenn Sie unsere Website besuchen. Sie helfen uns, Ihre Präferenzen und Einstellungen zu speichern, Ihre Website-Nutzung nachzuverfolgen und um uns bei der statistischen Auswertung zu unterstützen."} />
                </Headline>
                <Headline title={"Wir verwenden folgende Arten von Cookies:"}>
                    <Text text={"- Notwendige Cookies: Diese Cookies sind unbedingt erforderlich, um Ihnen die auf unserer Website angebotenen Dienste zur Verfügung zu stellen und einige Funktionen der Website zu ermöglichen."} />
                    <Text text={"- Funktionale Cookies: Diese Cookies helfen uns dabei, Ihre Präferenzen zu speichern und Ihre Nutzungserfahrung zu verbessern."} />
                    <Text text={"- Analyse-Cookies: Diese Cookies helfen uns, die Nutzung unserer Website zu analysieren und zu verstehen, um unsere Website besser zu optimieren und zu verbessern."} />
                    <Text text={"- Marketing-Cookies: Diese Cookies werden verwendet, um Ihnen relevante Anzeigen auf anderen Websites zu zeigen, die auf Basis Ihrer Interessen und Vorlieben ausgewählt wurden."} />
                    <Text text={"Sie können Ihre Cookie-Einstellungen jederzeit ändern oder Cookies jederzeit löschen, indem Sie die Einstellungen in Ihrem Browser anpassen. Wenn Sie die Verwendung von Cookies auf unserer Website ablehnen, kann es sein, dass bestimmte Funktionen auf der Website nicht richtig funktionieren."} />
                    <Text text={"Wir verwenden auch Drittanbieter-Tools wie Google Analytics, um das Nutzungsverhalten auf unserer Website zu analysieren. Diese Tools verwenden ebenfalls Cookies und ähnliche Technologien. Weitere Informationen darüber, wie Ihre Daten von diesen Tools erfasst und genutzt werden, finden Sie in den Datenschutzrichtlinien der jeweiligen Anbieter."} />
                    <Text text={"Wenn Sie Fragen oder Bedenken zu unserer Cookie-Richtlinie haben, wenden Sie sich bitte an info@thebutcheress.com."} />
                </Headline>
                <Headline title={"Änderungen an der Cookie-Richtlinie"}>
                    <Text text={"Wir behalten uns das Recht vor, diese Cookie-Richtlinie jederzeit zu ändern. Die aktuelle Version der Cookie-Richtlinie wird auf unserer Website veröffentlicht."} />
                </Headline>
                <Headline title={"Kontakt"}>
                    <Text text={"Wenn Sie Fragen zur Cookie-Richtlinie haben oder uns kontaktieren möchten,um Ihre Rechte in Bezug auf die Verarbeitung Ihrer Daten auszuüben, wenden Sie sich bitte an info@thebutcheress.com."} />
                    <Text text={"Bitte beachten Sie, dass Datenübertragungen im Internet nie vollständig sicher sein können und dass wir trotz aller Vorkehrungen keine absolute Sicherheit garantieren können."} />
                </Headline>
                <Headline title={"Opt-Out / Abmeldung des Newsletters"}>
                    <Text text={"Sie können sich jederzeit vom Newsletter abmelden, indem Sie auf den \"Abmelden\"-Link am Ende jeder unserer Newsletter-E-Mails klicken. Alternativ können Sie uns auch direkt kontaktieren oder eine E-Mail an info@thebutcheress.com senden, um Ihre Abmeldung aus unserem Newsletter-Verteiler zu beantragen. Wir werden Ihre E-Mail-Adresse dann aus unseren Kontakten entfernen und Sie erhalten keine weiteren Newsletter mehr von uns."} />
                    <Text text={"Bitte beachten Sie, dass es nach der Abmeldung bis zu 7 Tage dauern kann, bis Ihre E-Mail-Adresse aus unserem Newsletter-Verteiler entfernt wird. Während dieser Zeit können Sie möglicherweise noch weitere Newsletter von uns erhalten."} />
                </Headline>
            </main>
        </>

    )
}

export default DataPrivacyPage