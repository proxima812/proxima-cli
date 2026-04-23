# Registry

Place Proxima UI components here.

Each component should live in its own folder:

```txt
registry/
  component-name/
    manifest.json
    files/
      src/...
```

`manifest.json` format:

```json
{
  "name": "component-name",
  "dependencies": ["package-name"],
  "registryDependencies": ["another-component"],
  "files": [
    {
      "source": "src/components/ui/Component.astro",
      "target": "src/components/ui/Component.astro"
    }
  ]
}
```
