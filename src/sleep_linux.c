#include "sleep.h"
#include <unistd.h>

int os_usleep(unsigned int microseconds) {
  // Return 0 on success, return -1 on error
  int usleepRes = usleep(microseconds);
  return usleepRes;
}
