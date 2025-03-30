#!/usr/bin/env node
/* eslint-disable */
import { DeployLogger } from './dist/src/deploy-logger.js'

const deployLogger = new DeployLogger();

deployLogger.main();

