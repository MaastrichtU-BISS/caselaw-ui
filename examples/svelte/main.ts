import { mount } from 'svelte';
import App from './App.svelte';
import '../../src/styles/index.css';
mount(App, { target: document.getElementById('app')! });

import '../catalog.css';
