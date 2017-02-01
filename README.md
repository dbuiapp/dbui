DBUI
====

An all-in-one control panel for querying multiple data sources.

Currently this app is in early beta. The current supported datasources are SQLite,
MySQL, and Postgres, although this tool is designed to be ubiquitous and usable
with any type of datasource. Also supported are visualizations so you can view
your data at a glance, and many other features are planned for the future, such
as query builders, performance tools, and whatever features people find valuable.

Getting Started
===============

1. Install dependencies: `npm install`
2. Rebuild native modules: `npm run rebuild`
3. Run electron: `npm start`

TODO
====

- [ ] More visualization types
- [ ] Schema editor
- [ ] Query builder
- [ ] Data import / export
- [ ] CI integration
- [ ] Improve test suite
- [ ] Improve style
- [ ] Icons / branding
- [ ] Packaging for multiple platforms
- [ ] Support multiple backends (maybe)

Planned Future Datasource Targets
=================================

- [ ] MongoDB
- [ ] Redis
- [ ] Elasticsearch
