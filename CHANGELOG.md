# Vaping Changes

## [Unreleased]
### Added
### Fixed
### Changed
### Deprecated
### Removed
### Security

## [0.18.0]
### Fixed
- Something 1234wwwww
- Something 2234wwwww
- Something 3234wwwww


## [0.17.0]
### Fixed
- Something 1234wwwww
- Something 2234wwwww
- Something 3234wwwww

## [0.16.0]
### Fixed
- Something 1234
- Something 2234
- Something 3234

## [0.12.0]
### Fixed
- Something 1
- Something 2
- Something 3

## [0.11.0]
### Fixed
- Something 1
- Something 2
- Something 3


## [0.10.0]
### Fixed
- Something

## [0.9.0]
### Fixed
- issue #29: Python3 complains about bytes-like object in fping.py

### Changed
- port to pluginmgr .5
- updated other deps

## [0.8.0]
### Fixed
- issue #29: Python3 complains about bytes-like object in fping.py

### Changed
- port to pluginmgr .5
- updated other deps

## [0.5.0]
### Fixed
- issue #29: Python3 complains about bytes-like object in fping.py

### Changed
- port to pluginmgr .5
- updated other deps

## [0.4.0]
### Added
- timeseries db abstraction plugin
- whisper db plugin
- RRDtool db plugin

### Fixed
- pinned pluginmgr dependency to 0.4.0 as 0.5.0 currently breaks vaping


## [0.3.0]
### Added
- py3 support
- better startup failure messages
- check for plugin requirements (fping, zeromq)
- added on_start() and on_stop() events to plugins
- zeromq can connect or bind to socket

### Fixed
- #2 error if zeromq is missing
- #3 daemonize closes plugin fds

### Changed
- call start() on emit plugins
