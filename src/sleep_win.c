#include "sleep.h"
#include <windows.h>

/**
 * The unit of Windows system Sleep() is microseconds
 */
int os_usleep(unsigned int microseconds) {
  unsigned int miliseconds = microseconds / 1000;
  Sleep(microseconds);
  return 0;
}
