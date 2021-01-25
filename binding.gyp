{
  "targets": [
    {
      "target_name": "easy-sleep",
      "sources": [
        "src/sleep_init.c",
        "src/sleep.h",
        "src/sleep_win.c",
        "src/sleep_linux.c"
      ],
      "conditions": [
        [
          'OS == "win"', {
            "sources!": ["src/sleep_linux.c"]
          },
          'OS != "win"', {
            "sources!": ["src/sleep_win.c"]
          }
        ]
      ]
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [ "<(module_name)" ],
      "copies": [
        {
          "files": [ "<(PRODUCT_DIR)/<(module_name).node" ],
          "destination": "<(module_path)"
        }
      ]
    }
  ]
}