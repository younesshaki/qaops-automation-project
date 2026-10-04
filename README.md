# QAOps — Automatisation des tests et assurance qualité

Projet de fin de module couvrant les tests UI (Selenium), API (Postman/Newman), performance (JMeter), sécurité (OWASP ZAP) et l’intégration continue (Jenkins).

## Prérequis

- Node.js 20+ et Google Chrome
- Java 21+ et JMeter (pour la performance et Jenkins)
- OWASP ZAP installé dans `/Applications/ZAP.app` (macOS)

## Exécution

```bash
npm install
bash scripts/install-chromedriver.sh
npm run test:ui
npm run report:ui
npm run test:api
npm run test:performance
npm run test:security
```

Les rapports générés sont placés dans `reports/`. Les cibles de formation sont uniquement Formy Project et Reqres, conformément au sujet.

## Livrables

- Plan de tests : `docs/plan-de-tests.md`
- Rapport final : `docs/rapport-final.md` (et son export PDF)
- Collection Postman : `postman/reqres-collection.json`
- Plan JMeter : `performance/reqres-50-users.jmx`
- Rapport ZAP : `reports/security/`
- Pipeline : `Jenkinsfile`
