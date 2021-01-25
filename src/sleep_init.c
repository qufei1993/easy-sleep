#include "sleep.h"
#include <node_api.h>

napi_value usleepFn(napi_env env, napi_callback_info info) {
  size_t argc = 1;
  napi_value argv[1];

  NAPI_STATUS_CALL(env, napi_get_cb_info(env, info, &argc, argv, NULL, NULL));
  if (argc < 1) {
    napi_throw_type_error(env, NULL, "microseconds is required");
    return NULL;
  }

  napi_valuetype valueType;
  napi_typeof(env, argv[0], &valueType);
  if (valueType != napi_number) {
    napi_throw_type_error(env, NULL, "microseconds must be a number");
    return NULL;
  }

  int64_t microseconds;
  NAPI_STATUS_CALL(env, napi_get_value_int64(env, argv[0], &microseconds));

  // Return 0 on success, return -1 on error
  int usleepRes = os_usleep(microseconds);
  napi_value result;
  NAPI_STATUS_CALL(env, napi_create_int64(env, usleepRes, &result));

  return result;
}

napi_value init(napi_env env, napi_value exports) {
  napi_property_descriptor descriptor = {
    "usleep",
    NULL,
    usleepFn,
    NULL,
    NULL,
    NULL,
    napi_default,
    NULL
  };

  NAPI_STATUS_CALL(env, napi_define_properties(env, exports, 1, &descriptor));

  return exports;
}

NAPI_MODULE(sleep, init);
